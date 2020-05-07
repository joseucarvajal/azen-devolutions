import React from 'react';
import './ExploreContainer.scss';

import ManageDevolution from "../components/manage-devolution/manage-devolution.component";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
        <ManageDevolution></ManageDevolution>
    </div>
  );
};

export default ExploreContainer;
