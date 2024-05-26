import React, { useState, useRef } from 'react'; 


import AceEditor from 'react-ace';

// Import a mode (language) and theme
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';



const ImgDuplicator = () => { 

    const [code, setCode] = useState('// Write your code here\n');  


  const [htmlTemplate, setHtmlTemplate] = useState('// Copy Paste your Creative Here\n');
  const [modifiedHtml, setModifiedHtml] = useState('');

  const handleInputChange = (event) => {
    setHtmlTemplate(event.target.value);
  };

  const cleanEditors = () => {
    setHtmlTemplate(''); 
    setModifiedHtml(''); 
  }

  const duplicateImages = () => { 
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlTemplate, 'text/html');

    // Select all img elements
    const imgElements = doc.querySelectorAll('img');

    // Duplicate each img tag
    imgElements.forEach(imgElement => {
        // Clone the img element
        const duplicateImgElement = imgElement.cloneNode(true);

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

  return (
    <>   
        <div className='flex gap-3 mx-9 mt-5'>
            <button className='border p-3 bg-gradient-to-r from-blue-400 to-blue-800 text-white shadow-md hover:shadow-lg rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50' onClick={duplicateImages}>Duplicate Images</button>
            <button className='border p-3 bg-gradient-to-r bg-green-600 text-white shadow-md hover:shadow-lg rounded-md focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50' onClick={cleanEditors}>Clean</button>
        </div>

        <div className='p-9 grid grid-cols-2 gap-2'> 
            <AceEditor
                mode="javascript"
                theme="monokai"  
                editorProps={{ $blockScrolling: true }}
                value={htmlTemplate}
                onChange={( value) => {
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

        { modifiedHtml.length > 0 ? (
        <>
            <h2 className='px-9'>Modified HTML:</h2>
            <div className='p-9'>
                <iframe
                    title="Modified HTML"
                    srcDoc={modifiedHtml}
                    style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
                />
            </div>
        </>
      ) : ""} 

        <footer class="border-t py-4 text-center mt-24 text-black">
            <p class="text-sm">Developed by <a href="" class="underline">Anas Youssi</a> for E-Impact team</p>
        </footer> 
       
      {/* <div className='flex gap-3 my-2'>
        <button className='border p-3' onClick={duplicateImages}>Duplicate Images</button>
        <button className='border p-3' onClick={cleanEditors}>Clean</button>
      </div>

      <div className='p-9'> 
          <CodeMirror
            value={htmlTemplate}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true, 
            }}
            onBeforeChange={(editor, data, value) => {
              setHtmlTemplate(value);
            }}   
            className="border rounded-md mb-5"  
          />   
          <CodeMirror
            value={modifiedHtml}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true, 
            }}  
            className="border rounded-md" 
          /> 
      </div>

      {modifiedHtml.length > 0 ? (
        <>
            <h2 className='px-9'>Modified HTML:</h2>
            <div className='p-9'>
                <iframe
                    title="Modified HTML"
                    srcDoc={modifiedHtml}
                    style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
                />
            </div>
        </>
      ) : ""} */}

    </>
  )
}

export default ImgDuplicator