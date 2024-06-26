import React, { useState, useRef } from 'react'; 


import AceEditor from 'react-ace';

// Import a mode (language) and theme
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';



const ImgDuplicator = () => { 

  const [code, setCode] = useState('// Write your code here\n');    
  const [htmlTemplate, setHtmlTemplate] = useState('// Copy Paste your Creative Here\n');
  const [modifiedHtml, setModifiedHtml] = useState(''); 
  
  const [cleanAttrs, setCleanAttrs] = useState(false); 

  const handleInputChange = (event) => {
    setHtmlTemplate(event.target.value);
  };

  const cleanEditors = () => {
    setHtmlTemplate(''); 
    setModifiedHtml(''); 
  }

  const cleanHrefLinks = () => {

  }

  const removeDuplicatedImages = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlTemplate, 'text/html');

    // Select all img elements
    const imgElements = doc.querySelectorAll('img');

    // Iterate over each img element
    imgElements.forEach(imgElement => {
        const src = imgElement.getAttribute('src');

        // Check if src attribute starts with '//'
        if (src && src.startsWith('//')) {
            // Remove the img element from the DOM
            imgElement.remove();
        }
    });

    // Serialize the modified document back to HTML
    let updatedHtml = new XMLSerializer().serializeToString(doc);

    // Replace '&gt;' and '&lt;' with '>' and '<' respectively
    updatedHtml = updatedHtml.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

    // Update state with modified HTML
    setModifiedHtml(updatedHtml);
  }
























  const duplicateImages = () => { 
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlTemplate, 'text/html');

    // Select all img elements
    const imgElements = doc.querySelectorAll('img');

  

    // Duplicate each img tag
    imgElements.forEach(imgElement => {

      if(cleanAttrs) {
        // Remove the alt attribute from the duplicate img element
        imgElement.removeAttribute('alt');
        imgElement.removeAttribute('title');
      }

        // Clone the img element
        const duplicateImgElement = imgElement.cloneNode(true);

        if(cleanAttrs) {
          // Remove the alt attribute from the duplicate img element
          duplicateImgElement.removeAttribute('alt');
          duplicateImgElement.removeAttribute('title');
        }

        // Remove the protocol from the src attribute
        const originalSrc = imgElement.getAttribute('src');
        const modifiedSrc = originalSrc ? originalSrc.replace(/^https?:/, '') : '';

        // Set the modified src attribute on the duplicate img element
        duplicateImgElement.setAttribute('src', modifiedSrc);

        // Insert the duplicate img element after the original img element
        imgElement.insertAdjacentElement('afterend', duplicateImgElement);
    });

    // Serialize the modified HTML back to string
    let modifiedHtmlString = new XMLSerializer().serializeToString(doc);

    // Replace '&gt;' and '&lt;' with '>' and '<' respectively
    modifiedHtmlString = modifiedHtmlString.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

    // Update state with modified HTML
    setModifiedHtml(modifiedHtmlString);
  };  

  const handleCleanHref = () => {
    setCleanHref(!cleanHref);
  };

  const handlecleanAttrs = () => {
    setCleanAttrs(!cleanAttrs);
  };
   

  return (
    <div className="flex flex-col min-h-screen" style={{ position: 'relative' }}>
      <div className='mt-5 ml-9 flex gap-5 align-middle'>
        <div className=''>
          <button className='mr-5 border p-3 bg-gradient-to-r from-blue-400 to-blue-800 text-white shadow-md hover:shadow-lg rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50' onClick={duplicateImages}>Duplicate Images</button>
          <button className='mr-5 border p-3 bg-gradient-to-r from-blue-400 to-blue-800 text-white shadow-md hover:shadow-lg rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50' onClick={removeDuplicatedImages}>Remove Duplicate Images</button>
          <button className='border p-3 bg-gradient-to-r bg-green-600 text-white shadow-md hover:shadow-lg rounded-md focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50' onClick={cleanEditors}>Clean</button>
        </div>
        <div className='self-center'>
          <input 
            type="checkbox" 
            id='cleanTitle' 
            className='mr-2' 
            checked={cleanAttrs} 
            onChange={handlecleanAttrs}    
          />
          <label htmlFor='cleanTitle' className="select-none">Clean ALT & Title attrs</label>
        </div> 
      </div>
  
      <div className='p-9 grid grid-cols-2 gap-2'> 
        <AceEditor
          mode="javascript"
          theme="monokai"  
          editorProps={{ $blockScrolling: true }}
          value={htmlTemplate}
          onChange={(value) => {
            setHtmlTemplate(value);
          }}   
          setOptions={{ useWorker: false }}
          className="border rounded-md mb-5"  
          width="100%"
        />
        <AceEditor
          mode="javascript"
          theme="monokai"  
          editorProps={{ $blockScrolling: true }}
          value={modifiedHtml} 
          setOptions={{ useWorker: false }}
          className="border rounded-md" 
          width="100%" 
          showPrintMargin={false}
          readOnly={true} // Setting readOnly to true
        /> 
      </div>
  
      { modifiedHtml.length > 0 && (
        <>
          <h2 className='px-9'>Modified HTML:</h2>
          <div className='p-9'>
            <iframe
              title="Modified HTML"
              srcDoc={modifiedHtml}
              style={{ width: '100%', height: '400px', border: '1px solid #ccc', marginBottom: '50px' }}
            />
          </div>
        </>
      )}
  
      <footer className="w-full border-t py-4 text-center text-black bg-gray-100" style={{ position: 'absolute', bottom: 0, marginTop: '15px'  }}>
        <p className="text-sm">Developed by <a href="#" className="underline">Anas Youssi</a> for E-Impact team.</p>
      </footer>
    </div>
  );
  
}

export default ImgDuplicator