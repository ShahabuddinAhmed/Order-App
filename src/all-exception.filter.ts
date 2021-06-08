import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: Record<string, unknown>, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		let code = 'INTERNAL_SERVER_ERROR';

		const { statusCode, message, error } : any = exception instanceof HttpException ? exception.getResponse() : { message: exception.message, error: exception.message, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
		if (statusCode === 400) {
			code = 'E_INVALID_DATA';
		} else if (statusCode === 401) {
			code = 'UNAUTHORIZED';
		} else if (statusCode === 404) {
			code = 'NOT_FOUND';
		}

		response.status(statusCode).json({
			statusCode,
			code,
			message: typeof message === 'string' && statusCode !== 404 ? message : error,
			data: null,
			errors: statusCode === 404 ? [error] :  typeof message === 'string' ? [message] : message
		});
	}
}