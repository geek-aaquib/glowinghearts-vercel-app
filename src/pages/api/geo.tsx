// /pages/api/geo.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ||
      req.socket.remoteAddress ||
      '';

    // You can also hardcode your IP while testing if needed:
    // const ip = '8.8.8.8';
    // Normalize IPv6 localhost to IPv4 localhost
    if (clientIp === "::1" || clientIp === "0:0:0:0:0:0:0:1" || clientIp === process.env.ALLOWED_IP) {
      clientIp = process.env.DUMMY_URL!;
    }
    const url = `${process.env.IP_FENCING}${clientIp}`;
    console.log(url);
    const geoRes = await fetch(url);
    // console.log(geoRes)
    const data = await geoRes.json();
    // console.log(data)
    const relevant = {
      ip: data.ip,
      country_code: data.country_code,
      region: data.region,
      region_code: data.region_code,
      city: data.city,
      org: data.org,
      asn: data.asn,
      version: data.version,
      timezone: data.timezone,
      proxy: data?.security?.proxy, // true/false if supported
      vpn: data?.security?.vpn,
      tor: data?.security?.tor,
      anonymous: data?.security?.anonymous,
      hosting: data?.security?.hosting     // ipapi.co may not return this (optional)
    };

    res.status(200).json(relevant);
  } catch (err) {
    console.error('Geo API error:', err);
    res.status(500).json({ error: 'Failed to retrieve location info' });
  }
}
