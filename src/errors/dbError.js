class DbError extends Error {
	static REF_ERROR = 1452;
	static DUPLICATE_ENTRY_ERROR = 1062;
	static NOT_EXIST_ERROR = 1364;
	static CONNECTION_ERROR = 2006;
	static CANNOT_PROCESS_ERROR = 1292;
	static NO_ROW_ERROR = 1329;

	constructor(message, errno = null, stack = null) {
		super(message);
		this.name = "DbError";
		this.errno = errno;
		if (stack) {
			this.stack = stack;
		}

		switch (this.errno) {
			case DbError.REF_ERROR:
				this.shortMessage = "Database reference error";
				break;
			case DbError.DUPLICATE_ENTRY_ERROR:
				this.shortMessage = "Duplicate entry in database";
				break;
			case DbError.NOT_EXIST_ERROR:
				this.shortMessage = "Database entry does not exist";
				break;
			case DbError.CONNECTION_ERROR:
				this.shortMessage = "Database connection error";
				break;
			case DbError.CANNOT_PROCESS_ERROR:
				this.shortMessage = "Cannot process the database request";
				break;
			case DbError.NO_ROW_ERROR:
				this.shortMessage = "No rows found in database";
				break;
			default:
				this.shortMessage = "Database error occurred";
		}
	}

	isRefError() {
		return this.errno === DbError.REF_ERROR;
	}

	isDuplicateEntryError() {
		return this.errno === DbError.DUPLICATE_ENTRY_ERROR;
	}

	isNotExistError() {
		return this.errno === DbError.NOT_EXIST_ERROR;
	}

	// In case of lost connection to the database
	isConnectionError() {
		return this.errno === DbError.CONNECTION_ERROR;
	}

	// In case of invalid data format for a column
	cannotProcessError() {
		return this.errno === DbError.CANNOT_PROCESS_ERROR;
	}

	// Not found row(s)
	isNoRowError() {
		return this.errno === DbError.NO_ROW_ERROR;
	}
}
module.exports = DbError;
