import "./infoContent.scss";
import * as info from "../../../package.json";
import CircularIconButton from "../inputs/CircularIconButton";
import { CircleArrowOutUpRight } from "lucide-react";

export default function infoContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="infoContent">
      <h2>Information</h2>
      <div className="row">
        <div>Author:</div>
        <div>{info.author}</div>
      </div>
      <div className="row">
        <div>Version:</div>
        <div>{info.version}</div>
      </div>
      <div className="row">
        <div>Updated</div>
        <div>{info.lastUpdate}</div>
      </div>
      <a href="https://github.com/thedkmeir/WitchMarket">GitHub Link</a>
      <div className="button">
        <CircularIconButton
          onChange={onClose}
          icon={<CircleArrowOutUpRight size={18} strokeWidth={1.5} />}
        ></CircularIconButton>
      </div>
    </div>
  );
}
