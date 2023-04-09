import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../Components/TextEditor.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Select from 'react-select';
import "../App.css";
import jwt_decode from "jwt-decode";

export const Edit = () => {
  const [userId, setUserId] = useState(0);
  const { ids } = useParams();
  const [ispost, setpost] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    refreshToken();
}, []);

const refreshToken = async () => {
    try {
        const response = await axios.get('http://localhost:5000/token');
        const decoded = jwt_decode(response.data.accessToken);
        setUserId(decoded.userId)
        viewPostById(decoded.userId, decoded.permission_level);
    } catch (error) {
        if (error.response) {
            navigate("/");
        }
    }
}

const viewPostById = async(a,b) =>{
    try {
      await axios.get(`http://localhost:5000/findPostById/${ids}`)
      .then(res => { 
        if (b<1) {
            if (res.data.creator_id !== a) {
                navigate('/nopermission')
            }
        }
          setpost(res.data);
          setDefaultValue(res.data)
      })
    } catch (error) { throw error;}
  }

  const optionList = [
    { value: "hammer", label: "hammer" },
    { value: "axe", label: "axe" },
    { value: "crowbar", label: "crowbar" },
    { value: "drill", label: "drill" },
    { value: "spade", label: "spade" }
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [cover_image, setCover_Image] = useState("https://feelforhair.co.uk/wp-content/uploads/2017/12/default-post-thumbnail.png");
  let [sendSelectedOption, setSendSelectedOption] = useState("");;
  
  const [userInfo, setuserInfo] = useState({
      title: '',
      short_desc: '',
      long_desc: '',
      tools: '',
    }
    );


    const setDefaultValue= (e) => {
        setuserInfo({
            ...userInfo,
            "title":e.title,
            "short_desc":e.short_desc,
            "long_desc":e.long_desc,
            "tools":e.tools
          });
          setCover_Image(e.cover_image)
    }
    
    const onChangeValue = (e) => {
      setuserInfo({
        ...userInfo,
        [e.target.name]:e.target.value
      });
    } 
    const ondescription = (value) => {
      setuserInfo({ ...userInfo,
        long_desc:value
      });
    } 

    const [isError, setError] = useState(null);
    const addDetails = async (event) => {
      try {
        event.preventDefault();
        event.persist();



        if(userInfo.long_desc.length < 50){
          setError('Required, Add description minimum length 50 characters');
          return;
        }

        await axios.put(`http://localhost:5000/updatePost/${Number(ids)}`, {
          title: userInfo.title,
          cover_image: cover_image,
          short_desc: userInfo.short_desc,
          long_desc: userInfo.long_desc,
          tools: sendSelectedOption,
          creator_id: userId
        })
        navigate('/');
      } catch (error) { throw error;}    
    } 
  

var handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    selectedOption.forEach(e => {
      setSendSelectedOption(sendSelectedOption + e.value + ";");
      });
  };



  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#222831" : "#00ADB5",
      backgroundColor: state.isSelected ? "#00ADB5" : "#222831",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#222831",
      padding: "10px",
      border: "none",
      boxShadow: "none",
      width: "90%"
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#222831" }),
  };



  return ( 
  <>
    <div className="App">
      <div className="container">
        <div className="row"> 
          <form onSubmit={addDetails} className="update__forms">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
                <p>Please write a title for your CraftTip!</p>
                <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-content" required />
              </div>
              <div className="clearfix"></div>
              <div>
                <br /><label className="font-weight-bold"> Cover image </label>
                <p>LINK the image you want to use as a cover for your post. Leaving empty equals using the sample image.</p>
                <input type="text" name = "cover_image" className="form-content" value={cover_image}  onChange={(e) => setCover_Image(e.target.value)}/>
              </div>
              <div>
                <br /><label className="font-weight-bold"> Short Description <span className="required"> * </span> </label>
                <p>
                  Please write a short description for your CraftTip.  
                  Just tell the basic capabilities of your tip and what it can be used for. 
                  (Maximum 150 letter)
                </p>
                <textarea rows="4" cols={50} maxLength={150} value={userInfo.short_desc} onChange={onChangeValue} name = "short_desc" className="form-content"/>
              </div>
           
              <div className="form-group col-md-12 editor">
                <br /><label className="font-weight-bold"> Long Description <span className="required"> * </span> </label>
                <p>This is the main part where you can tell instructions, upload images for guidance or link in video for your tip.
                  The limis is only your imagination, try to be as creative as you can! :) 
                </p>
              <EditorToolbar toolbarId={'t1'}/>
              <div className="center">
              <ReactQuill
                theme="snow"
                value={userInfo.long_desc}
                onChange={ondescription}
                placeholder={"Write something awesome..."}
                modules={modules('t1')}
                formats={formats}
                className="form-content"
                align="center"
              />
              </div>
              </div>
              <div>
                <br /><label className="font-weight-bold"> Tools <span className="required"> * </span> </label>
                <p>Select the tools needed for this project from this dropdown menu. You can select multiple one, and also search for the ones you are looking for.</p>
                <div className="center">
                  <Select
                     isMulti
                     options={optionList}
                     placeholder="Select the tools needed!"
                     onChange={handleChange}
                     isSearchable={true}
                     styles={customStyles}
                    
                  />
                 
                </div>
                
                <h1></h1>
              </div>
             
              <br />
              <br />
              {isError !== null && <div className="errors"> {isError} </div>}
              <div className="form-group col-sm-12 text-right">
                <button type="submit" className="btn"> Submit  </button>
              </div> 
            </div> 
          </form>
        </div>
      </div>
    </div>
  </>
  )
}
