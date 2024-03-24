import useWebSocket from "../../customHook/useWebSocket.ts";

function End() {
    const { restart } = useWebSocket();

    const onRestart= () => {
        restart();
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <button type="submit" onClick={onRestart}>Restart</button>
        </div>
    );
}

export default End;