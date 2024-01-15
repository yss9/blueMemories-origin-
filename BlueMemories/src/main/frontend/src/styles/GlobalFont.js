import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import InkFree from "../fonts/Inkfree.ttf";
import GangwonEduSaeeum from "../fonts/GangwonEduSaeeum.ttf";

const GlobalFont = createGlobalStyle`    
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
`;

export default GlobalFont;