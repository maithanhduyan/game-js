import java.awt.Container;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;

public class PlayerUI extends JFrame implements ActionListener {

	private static final long serialVersionUID = 1L;

	public PlayerUI() {
		super();
		
		java.awt.Dimension d = new java.awt.Dimension(300, 400);
		
		setPreferredSize(d);
		
		setSize(d);
		
		Container c = getContentPane();
		
		GridLayout layout = new GridLayout();
		
		layout.setColumns(1);
		
		layout.setRows(6);
		
		c.setLayout(layout);
		
		addWindowListener(new java.awt.event.WindowAdapter() {
			@Override
			public void windowClosing(WindowEvent e) {
				if (c != null) {
//					c.close();
				}
				dispose();
			}
		});

		setLocationRelativeTo(null);
		setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub

	}

	public static void main(String[] args) {
		new PlayerUI();
	}
}
