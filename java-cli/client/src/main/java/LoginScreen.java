
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import java.awt.GridLayout;
import javax.swing.SwingConstants;

public class LoginScreen extends JPanel {
	private static final long serialVersionUID = 1L;
	private JTextField usernameField;
	private JPasswordField passwordField;
	private Client client;
	private JFrame parentFrame;

	public LoginScreen(Client client, JFrame frame) {
		this.client = client;
		this.parentFrame = frame;
//		this.parentFrame.setSize(300, 150);
		setLayout(new GridLayout(3, 2, 0, 0));

		JLabel label = new JLabel("Username:");
		label.setHorizontalAlignment(SwingConstants.CENTER);
		add(label);
		usernameField = new JTextField();
		usernameField.setHorizontalAlignment(SwingConstants.CENTER);
		add(usernameField);

		JLabel label_1 = new JLabel("Password:");
		label_1.setHorizontalAlignment(SwingConstants.CENTER);
		add(label_1);
		passwordField = new JPasswordField();
		passwordField.setHorizontalAlignment(SwingConstants.CENTER);
		add(passwordField);

		JButton loginButton = new JButton("Login");
		loginButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				String username = usernameField.getText();
				char[] password = passwordField.getPassword();
				// Xử lý đăng nhập ở đây
				client.handleLogin(username, password);
			}
		});
		add(loginButton);
	}
}