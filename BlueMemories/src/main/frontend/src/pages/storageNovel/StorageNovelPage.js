import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { LoggedInNavigationBar } from '../../components/NavigationBar';


const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction:column;
`;


const StorageNovelForm = () => {
    return (
        <div>
            <Helmet>
            <title>StorageNovel</title>
            <meta name="description" content="BlueMemories Introduce Page"/>
            </Helmet>

            <Wrapper>
                <LoggedInNavigationBar></LoggedInNavigationBar>
     
            </Wrapper>
        </div>
    );
};

export default StorageNovelForm;
