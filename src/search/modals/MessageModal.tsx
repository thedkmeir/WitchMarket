import "./MessageModal.scss";

export type MessageParams = { msg: string };

export default function MessageModal(props: MessageParams) {
  return (
    <div className="messageModal">
      {props.msg}
    </div>
  );
}
