import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMenueAdd() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  let navigate = useNavigate();

  function addMenue() {
    const formData = {
      name: name,
      img: img
    }
   
    console.log("formData",formData);

    fetch("http://localhost:3030/menue", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then(() => {
        const modalElement = document.getElementById("addMenuModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Navigate to the menu page
      window.location.reload();
        navigate("/admin/menue");
      })
      .catch((err) => console.error("Error:", err));
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Validate file count
    if (files.length > 1) {
        alert("You can only upload up to 1 images");
        return;
    }

    // Validate file types and sizes
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = files.filter(file => {
        if (!validTypes.includes(file.type)) {
            alert(`File ${file.name} is not a valid image type`);
            return true;
        }
        if (file.size > maxSize) {
            alert(`File ${file.name} is too large. Maximum size is 5MB`);
            return true;
        }
        return false;
    });

    if (invalidFiles.length > 0) {
        return;
    }

    try {
        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default2'); // Ensure this matches your preset name

            console.log('Uploading file:', file.name); // Log the file being uploaded

            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dfojntght/image/upload', // Use the correct cloud name
                {
                    method: 'POST',
                    body: formData
                }
            );

            console.log('Response status:', response.status); // Log the response status

            if (!response.ok) {
                const errorText = await response.text(); // Read the error message
                throw new Error(`Upload failed: ${errorText}`);
            }

            const data = await response.json(); // Parse the response as JSON
            console.log('Uploaded file data:', data); // Log the parsed JSON data

            return data.secure_url; // Return the secure URL of the uploaded image
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        console.log("uploadedUrls",uploadedUrls[0]);
        setImg(uploadedUrls[0]);

        // Show success message
        alert('Images uploaded successfully!');

    } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images. Please try again.');
    }
};

  return (
    <>
    <div className="container d-flex justify-content-center">
      <div className="card p-5" style={{width:"80%",backgroundColor:"lightgrey"}}>

         <label className="fw-bolder mb-2">Food Type :</label>
          <input
          className="form-control mb-3"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <label className="fw-bolder mb-2">Select Img :</label>
          <input
          className="mb-3"
            type="file"
            onChange={handleImageUpload} // Capture the file object
            placeholder="Upload image"
          />
          <br />
          <div className="d-flex justify-content-center">
            <input
            className="py-1 btn btn-success"
              style={{width:"20%"}}
              type="button"
              value="Add"
              onClick={addMenue}
            />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AdminMenueAdd;































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// function AdminMenueAdd() {
//   const [data, setData] = useState({});
//   let navigate = useNavigate();

//   function addMenue() {
//     fetch("http://localhost:3030/menue",{
//       method: "post",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" }
//     }).then((res) => {
//       navigate("/admin/menue");
//     });
//     return <></>;
//   }


//   return (
//     <>
//       <input
//         type="text"
//         onChange={(e) => {
//           setData({ ...data, name:e.target.value });
//         }}
//         placeholder="enter name"
//       />
//       <input
//         type="file"
//         onChange={(e) => {
//           setData({ ...data,img:e.target.value });
//         }}
//         placeholder="Enter img"
//       />
//       <br />

//       <input
//         type="button"
//         value="Add"
//         onClick={() => {
//           addMenue();
//         }}
//       />
//     </>
//   );
// }

// export default AdminMenueAdd;
