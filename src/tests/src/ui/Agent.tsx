import {useSmartAgent, useSmartComponentManager} from "smart-ui"
import {useState} from "react";

export default function Agent() {
    const [value, setValue] = useState("");

    const {sendPrompt, approvalRequired, handleChangeApproval} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();

    return (
        <div>
            <textarea id="prompt" style={{ height: "400px", width: "100%", lineHeight: "12px" }} value={value} onChange={(event) => setValue(event.target.value)} />
            <button id="send" onClick={() => sendPrompt(value)}>Send</button>
            {approvalRequired && <div>
                <button id="deny" onClick={async () => await handleChangeApproval(false)}>Deny</button>
                <button id="approve" onClick={async () => await handleChangeApproval(true)}>Approve</button>
            </div>}
            <button id="print-structure" onClick={() => console.log(JSON.stringify(getHierarchy()))}>Print structure</button>
        </div>
    );
}