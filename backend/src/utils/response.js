export const succussResponse = (res, status, message, data) =>
  res.status(status || 200).json({ success: true, message, data });

export const errorResponse = (res, status, message, data) =>
  res.status(status || 500).json({ success: false, message, data });
