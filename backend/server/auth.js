import crypto from "crypto";

const SESSION_COOKIE = "invoice_admin";
const SESSION_TTL_DAYS = 7;

const base64UrlEncode = (value) =>
  Buffer.from(value).toString("base64url");

const base64UrlDecode = (value) =>
  Buffer.from(value, "base64url").toString("utf-8");

const sign = (payload, secret) => {
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
};

const verify = (token, secret) => {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  const payload = JSON.parse(base64UrlDecode(body));
  if (!payload?.exp || Date.now() > payload.exp) {
    return null;
  }
  return payload;
};

export const issueSessionCookie = (res, secret) => {
  const exp = Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
  const token = sign({ sub: "admin", exp }, secret);

  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
  });
};

export const clearSessionCookie = (res) => {
  res.clearCookie(SESSION_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const requireAdmin = (req, res, next) => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Missing SESSION_SECRET." });
  }
  const token = req.cookies?.[SESSION_COOKIE];
  const payload = verify(token, secret);
  if (!payload) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  next();
};

export const isAdminAuthenticated = (req) => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  const token = req.cookies?.[SESSION_COOKIE];
  return Boolean(verify(token, secret));
};
