import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editpost from './EditPosts';

export const Edit = () => {
    const { ids } = useParams();

    useEffect(() => {
        viewPostId(ids);
      }, []);
            
      const [ispostId, setpostId] = useState([]);
      const viewPostId = async(ids) =>{
        try {
           axios.get(`http://localhost:3001/getPostId/${ids}`
          )
          .then(res => {
              setpostId(res.data);
          })
        } catch (error) { throw error;}
      }
            
    return (
    <>
      {ispostId.length > 0 ? <>    
        <Editpost postList={ispostId}  editPostID={ids} />      
      </> : null }
    
    </>
    )
}
