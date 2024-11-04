import fs from 'fs';
import path from 'path';

// Đường dẫn tới file log
const logFilePath = path.join(process.cwd(), 'logs', 'app.log');

// Đảm bảo thư mục logs tồn tại
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

class Logger {
  static log(message: string) {
    const logMessage = `[LOG] ${new Date().toISOString()}: ${message}\n`;
    console.log(logMessage); // In ra console
    fs.appendFileSync(logFilePath, logMessage); // Ghi vào file log
  }

  static error(message: string) {
    const errorMessage = `[ERROR] ${new Date().toISOString()}: ${message}\n`;
    console.error(errorMessage); // In ra console
    fs.appendFileSync(logFilePath, errorMessage); // Ghi vào file log
  }
}

export default Logger;
