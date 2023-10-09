import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class MainScreen extends JPanel {
	private JTextArea chatArea;
	private JTextField messageField;
	private JButton sendButton;
	private JFrame parentFrame;
	private Client client;
	public MainScreen(Client client,JFrame frame) {
		this.client = client;
		this.parentFrame = frame;
//		this.parentFrame.setSize(550, 350);
		setLayout(new BorderLayout());

		// Hiển thị tin nhắn trong một JTextArea
		chatArea = new JTextArea();
		chatArea.setEditable(false);
		JScrollPane scrollPane = new JScrollPane(chatArea);
		add(scrollPane, BorderLayout.CENTER);

		// Panel chứa trường nhập và nút gửi
		JPanel inputPanel = new JPanel(new BorderLayout());
		messageField = new JTextField();
		inputPanel.add(messageField, BorderLayout.CENTER);

		// Nút gửi
		sendButton = new JButton("Gửi");
		sendButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				// Gửi tin nhắn từ client đến server
				String message = messageField.getText();
				// Gửi tin nhắn đến server ở đây
				// Ví dụ: client.sendMessageToServer(message);
				// Hiển thị tin nhắn trong chatArea
				chatArea.append("Client: " + message + "\n");
				messageField.setText(""); // Xóa nội dung trường nhập sau khi gửi
			}
		});
		inputPanel.add(sendButton, BorderLayout.EAST);
		add(inputPanel, BorderLayout.SOUTH);
	}
}
