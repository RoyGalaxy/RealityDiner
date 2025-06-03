import "@google/model-viewer";
import { FiBox } from "react-icons/fi";
import ProductListAR from "./ProductListAR";
import ARMenu from "./ARMenu";

const ModelViewer = ({src}) => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0">
      <model-viewer
        // src={src}
        src={`${import.meta.env.VITE_BACKEND_URL}/model3d/653afcf9-13a2-4e48-84e5-906dd12a2621breakfast.glb`}
        poster={`${import.meta.env.VITE_BACKEND_URL}/image/1QCFCk1SDXlEoHVwIAyHLjscmJ2ngRO2a.jpg`}
        alt="A 3D Astronaut"
        auto-rotate
        camera-controls
        ar
        // ar-modes="webxr scene-viewer quick-look"
        style={{ width: "100%", height: "100%" }}
      >
        {/* AR Button */}
        <button
          slot="ar-button"
          className="flex items-center gap-2 absolute top-20 left-4 text-lg text-white-soft py-2 px-5 bg-primary rounded-lg shadow-md border-none cursor-pointer"
        >
          <FiBox fontSize={20} />
          View in AR
        </button>
        
        {/* Product List */}
        <ARMenu />
        <ProductListAR />
      </model-viewer>
    </div>
  );
};

export default ModelViewer;
