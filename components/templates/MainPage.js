import React from 'react';
import Banner from '../module/Banner';
import Companies from "../module/Companies";
import Description from "../module/Description";
import Guide from "../module/Guid";
import Instruction from "../module/Instruction";
import Restrictions from "../module/Restriction";
import Attributes from '../module/Attribute';

const MainPage = () => {
    return (
        <div>
            <Banner/>
            <Attributes/>
            <Description/>
            <Companies/>
            <Instruction/>
            <Guide/>
            <Restrictions/>
        </div>
    );
};

export default MainPage;