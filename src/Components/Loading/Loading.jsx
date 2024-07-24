

import React from 'react'
 import { RotatingLines } from 'react-loader-spinner'

// import { FallingLines } from 'react-loader-spinner'


export default function Loading() {
    return (
        <>

            <div className="flex justify-center items-center h-screen">
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />

                {/* <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                /> */}
            </div>

        </>
    )
}
