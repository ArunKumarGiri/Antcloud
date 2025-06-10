import Spinner from "./spinner";

function Waiting({length, waittime}) {
    return (
        <div>
            <h3
            style={{ textAlign: "center", marginTop: "50px" }}
            >
                You are in queue. Your number is:{" "}
                <span style={{ color: "#db4bc3" }}>{length}</span>{" "}
                Est wait time:{" "}
                <span style={{ color: "#db4bc3" }}>{waittime}</span>
                <br />
                Your time waiting in queue is not counted against
                the time in your plan.
            </h3>
            <Spinner topPosition={40}/>
        </div>
    );
}

export default Waiting;