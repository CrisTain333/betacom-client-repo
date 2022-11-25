import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Myloader = () => {
    return (
        <>
        <div className="h-1/2 w-full flex justify-center items-center mt-20">
        <ThreeCircles
                          height="150"
                          width="150"
                          color="#f82c38"
                          wrapperStyle={{}}
                          wrapperclassName=""
                          visible={true}
                          ariaLabel="three-circles-rotating"
                          outerCircleColor=""
                          innerCircleColor=""
                          middleCircleColor=""
                        />
      </div>
            
        </>
    );
};

export default Myloader;