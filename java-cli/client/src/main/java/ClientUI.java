import java.awt.CardLayout;

import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

public class ClientUI extends JFrame {
	private static final long serialVersionUID = 1L;
	private JTextField usernameField;
	private JPasswordField passwordField;
	private Client client;
	private LoginScreen loginScreen;
	private MainScreen mainScreen;
	private CardLayout cardLayout;
	private JPanel cardPanel;

	public ClientUI(Client client) {
		this.client = client;
		this.setTitle("Card Game");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		cardLayout = new CardLayout();
		cardPanel = new JPanel(cardLayout);

		loginScreen = new LoginScreen(client, this);
		mainScreen = new MainScreen(client, this);

		// Thêm hộp thoại Đăng Nhập và màn hình chính vào cardPanel
		cardPanel.add(loginScreen, "LOGIN");
		cardPanel.add(mainScreen, "MAIN");

		this.add(cardPanel);
//		this.setSize(550, 350);
		this.setLocationRelativeTo(null);
		this.setVisible(true);

		// Hiển thị hộp thoại Đăng Nhập khi ứng dụng bắt đầu
		showLoginScreen();
	}

	public void showLoginScreen() {
		this.setSize(300, 150);
		cardLayout.show(cardPanel, "LOGIN");
	}

	public void showMessage(String message) {
		JOptionPane.showMessageDialog(this, message);
	}

	public void showMainScreen() {
		this.setSize(550, 350);
		cardLayout.show(cardPanel, "MAIN");
	}
}
