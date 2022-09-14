const Redis = require("ioredis");

let client = new Redis("redis://:9e4bfd4918be48d4bd6290b807ae0319@apn1-unique-rabbit-33775.upstash.io:33775");
client.get('foo', 'bar');