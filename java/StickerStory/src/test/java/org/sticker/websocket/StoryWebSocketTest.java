package org.sticker.websocket;

import static org.mockito.Mockito.when;

import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class StoryWebSocketTest {

    @InjectMocks
    private StoryWebSocket storyWebSocket;

    @Mock
    private Session mockSession;

    @Mock
    private RemoteEndpoint.Basic mockBasic;

    @Test
    public void testOnOpen() throws Exception {
        MockitoAnnotations.initMocks(this);

        when(mockSession.getBasicRemote()).thenReturn(mockBasic);

        storyWebSocket.onOpen(mockSession);

        // Add your assertions here to verify the behavior after opening a session
    }

    @Test
    public void testOnClose() throws Exception {
        MockitoAnnotations.initMocks(this);

        storyWebSocket.onClose(mockSession);

        // Add your assertions here to verify the behavior after closing a session
    }

    @Test
    public void testOnMessage() throws Exception {
        MockitoAnnotations.initMocks(this);

        Sticker sticker = new Sticker();
        // Set up your Sticker object as needed for testing

        when(mockSession.getBasicRemote()).thenReturn(mockBasic);

        storyWebSocket.onMessage(mockSession, sticker);

        // Add your assertions here to verify the behavior after receiving a message
    }
}
