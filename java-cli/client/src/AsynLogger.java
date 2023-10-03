import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class AsynLogger {
	private static final Logger logger = Logger.getLogger(AsynLogger.class.getName());

	static {
		// Tạo FileHandler để ghi log vào tệp tin "app.log"
		try {
			Handler fileHandler = new FileHandler("app.log");
			fileHandler.setFormatter(new SimpleFormatter());

			// Thiết lập việc ghi log bất đồng bộ cho FileHandler
			((FileHandler) fileHandler).setLevel(Level.ALL);
			((FileHandler) fileHandler).setFilter(null);
			((FileHandler) fileHandler).setFormatter(new SimpleFormatter());

			// Thêm FileHandler vào Logger
			logger.addHandler(fileHandler);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Phương thức để ghi log bất đồng bộ
	public static void logInfo(String message) {
		// Ghi log bất đồng bộ
		logger.log(Level.INFO, message);
	}

}
