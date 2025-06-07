
const libxmljs = require('libxmljs');

exports.handleXxeParse = (req, res) => {
  try {
    let rawXML;
    console.log(" Backend received req.body:", JSON.stringify(req.body, null, 2));

    if (req.body && typeof req.body.xml_payload === 'string') { // <<< CHANGED HERE
      rawXML = req.body.xml_payload;                             // <<< AND HERE
    } else if (typeof req.body === 'string') {

      rawXML = req.body;
    }

    if (!rawXML) {
      return res.status(400).json({
        success: false,
        error: 'XML payload not found.', // Frontend จะใช้ key 'error'
        message: 'XML payload not found. Expected a JSON object with an "xml_payload" key, or a raw XML string.',
      });
    }


    if (rawXML.trim() === "") {
        return res.status(400).json({
            success: false,
            error: 'XML payload is empty.',
            message: 'XML payload is empty.',
        });
    }

    let isXxeSuspected = false;
    if (rawXML && rawXML.toLowerCase().includes('<!entity') && rawXML.toLowerCase().includes('system')) {
        isXxeSuspected = true;
    }

    const doc = libxmljs.parseXml(rawXML, { replaceEntities: true });

    if (doc.root() === null) {
      return res.status(400).json({
        success: false,
        error: 'Invalid XML format or no root element',
        message: 'Invalid XML format or no root element',
      });

    }



    const content = doc.root().text() || '';
    console.log("Parsed content:", content); // DEBUG
    console.log("Is XXE suspected:", isXxeSuspected); // DEBUG
    console.log("Original XML to echo:", rawXML); // DEBUG

     res.json({
      success: true,
      message: 'flag: !tc68_F1ag{R3v34lXXE_h3lp____} XML parsed successfully.', // หรือ message อื่นๆ ตามความเหมาะสม
      parsedContent: content,
      isXxeSuspected: isXxeSuspected,   // <<<<<<< ส่งค่านี้
      originalXmlEcho: rawXML          // <<<<<<< ส่งค่านี้
    });
    // -----
    // if (content || content === '') { 
    //   res.json({
    //     success: true,
    //     message: (content || content === '') ? 'XML parsed successfully.' : 'No text content found in XML root element.', // Or some other success message
    //     parsedContent: content || '',

    //   });
    // } else {

    //   res.json({
    //     success: true,
    //     message: (content || content === '') ? 'XML parsed successfully.' : 'No text content found in XML root element.',
    //     parsedContent: content,
    //     isXxeSuspected: isXxeSuspected, 
    //     originalXmlEcho: rawXML || "(No XML received)"
    //   });
    // }

  } catch (err) {
    console.error("XXE Processing Error:", err);

    res.status(500).json({
      success: false,
      message: `Error processing XML: ${err.message}`,
      error: `Error processing XML: ${err.message}`,
    });

  }
};