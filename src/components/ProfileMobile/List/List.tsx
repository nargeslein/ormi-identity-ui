import React from "react";
import Info from "./../Info/Info"
import "./index.scss";

interface ListProps {
    title: string;
}

const List: React.FC<ListProps> = ({title}) => {
    
    return(
     <div className="dataBox">
         <div className="titleBox">
                 <h4 className="title">{title}</h4>
                 <Info/>
         </div>
     </div>
    );
}

export default List;
