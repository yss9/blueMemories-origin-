import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import InkFree from "../fonts/Inkfree.ttf";
import GangwonEduSaeeum from "../fonts/GangwonEduSaeeum.ttf";
import BokkBold from "../fonts/BokkBold.ttf";
import BokkLight from "../fonts/BokkLight.ttf";

const GlobalFont = createGlobalStyle`   
    ${reset};
     @font-face {
        font-family: "inkfree";
        src: local("inkfree"), url(${InkFree}) format('ttf'); 
        font-weight: normal;
    }
    @font-face {
        font-family: "gangwonedusaeeum";
        src: local("gangwonedusaeeum"), url(${GangwonEduSaeeum}) format('ttf'); 
        font-weight: normal;
    }
    @font-face {
        font-family: "bokkbold";
        src: local("bokkbold"), url(${BokkBold}) format('ttf'); 
        font-weight: normal;
    }
    @font-face {
        font-family: "bokklight";
        src: local("bokklight"), url(${BokkLight}) format('ttf'); 
        font-weight: normal;
    }

`;

 
export default GlobalFont;