import { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Gallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([
    "/images/image-11.jpeg",
    "/images/image-1_clipdrop-background-removal.webp",
    "/images/image-2_clipdrop-background-removal.webp",
    "/images/image-3_clipdrop-background-removal.webp",
    "/images/image-4_clipdrop-background-removal.webp",
    "/images/image-5_clipdrop-background-removal.webp",
    "/images/image-6_clipdrop-background-removal.webp",
    "/images/image-7.webp",
    "/images/image-8.webp",
    "/images/image-9.webp",
    "/images/image-10.jpeg",
  ]);

  const [remainingImages, setRemainingImages] = useState([...images]);

  const handleImageClicked = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleDeleteImage = () => {
    const filteredImages = images.filter((_, index) => !selectedImages.includes(index));
    setImages([...filteredImages]);
    setRemainingImages([...filteredImages]);
    setSelectedImages([]);
  };

  const handleUploadImage = (event) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles.length > 0) {
      const newImages = Array.from(uploadedFiles).map((file) => {
        const objectUrl = URL.createObjectURL(file);
        return objectUrl;
      });
      setImages([...images, ...newImages]);
      setRemainingImages([...images, ...newImages]);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
    setRemainingImages(items);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-4">Gallery</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps} 
              className="grid grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {remainingImages.map((image, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`image-container relative p-2 ${selectedImages.includes(index) ? "bg-gray-200" : ""} ${index === 0 ? "col-span-3 lg:col-span-2" : "col-span-1"}`}
                      onClick={() => handleImageClicked(index)}
                    >
                      <img
                        src={image}
                        alt=""
                        className={`w-full h-auto ${index === 0 ? "lg:h-full lg:w-full" : "lg:h-40 lg:w-auto"}`}
                      />
                      {selectedImages.includes(index) && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={() => handleImageClicked(index)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 011 1v1h2a1 1 0 110 2h-1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8H2a1 1 0 110-2h2V5zm2-1h10v1H5V4zm3 10a1 1 0 011-1h2a1 1 0 010 2H9a1 1 0 01-1-1zm7-7a1 1 0 00-1-1H7a1 1 0 100 2h4a1 1 0 110 2H8a3 3 0 01-3-3V8a3 3 0 013-3h6a3 3 0 013 3v1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 011 1v1h2a1 1 0 110 2h-1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8H2a1 1 0 110-2h2V5zm2-1h10v1H5V4zm3 10a1 1 0 011-1h2a1 1 0 010 2H9a1 1 0 01-1-1zm7-7a1 1 0 00-1-1H7a1 1 0 100 2h4a1 1 0 110 2H8a3 3 0 01-3-3V8a3 3 0 013-3h6a3 3 0 013 3v1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {selectedImages.length > 0 && (
        <button
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
          onClick={handleDeleteImage}
        >
          Delete {selectedImages.length} {selectedImages.length === 1 ? "Image" : "Images"}
        </button>
      )}
      <div className="mt-4">
        <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Add Images
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          multiple
          onChange={handleUploadImage}
        />
      </div>
    </div>
  );
};

export default Gallery;
