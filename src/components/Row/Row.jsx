import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from '../../utils/useRaisedShadow'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import "./Row.css"
import Swal from "sweetalert2";
import Toggle from "../Toggle/Toggle";

export const Row = ({ 
  i, 
  title, 
  setActiveTitle, 
  activeTitle, 
  rawData, 
  setRawData }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    const isEdit = activeTitle === title;

    const mainClassName = `title-element ${!isEdit &&  activeTitle !== null? "grey" : ""}`

    const handleInfo = () => {
      let description = rawData[i]["description"]
      Swal.fire(rawData[i]["title"], description, 'info')
    }

    function handleDone() {
      let text = document.getElementById("input").value
      rawData[i]["title"] = text
      console.log(text, rawData)
      setActiveTitle(null)
      setRawData(rawData)
    }

    return (
      <Reorder.Item
        value={title}
        id={title}
        style={{ boxShadow, y}}
        dragListener={false}
        dragControls={dragControls}
        className={mainClassName}
      >
        <div className="title-left">
          <div className="MenuRoundedIcon">
            <MenuRoundedIcon onPointerDown={(event) => dragControls.start(event)} />
          </div>
          <InfoOutlinedIcon onClick={() => handleInfo()} className="InfoOutlinedIcon" />
          {isEdit ? (
            <input type="text" id="input" defaultValue={title} />
          ) : (
            <span>{rawData[i]['title']}</span>
          )}
        </div>

        <div className="title-right">
          {isEdit ? (
            <DoneRoundedIcon onClick={()=>handleDone()} className="DoneRoundedIcon" />
            ) : (
            <EditRoundedIcon onClick={()=>setActiveTitle(title)} className="EditRoundedIcon" />
          )}
          <Toggle sx={{m:1}} defaultChecked />
        </div>

      </Reorder.Item>
    );
};
