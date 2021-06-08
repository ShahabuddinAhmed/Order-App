import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
    constructor() {}
    
    public async offsetLimitParser(offset = 0, limit = 25): Promise<{ offset: number; limit: number }> {
		offset = offset < 0 ? 0 : offset;
		limit = limit <= 0 ? 25 : limit > 25 ? 25 : limit;
		return { offset, limit };
	};

    public async uniqueID(ip: string): Promise<string> {
		return ip.replace('::ffff:', '').replace(/./g, '') + new Date().getTime().toString();
	};
}
