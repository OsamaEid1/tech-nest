'use client'
import DynamicTitle from "@components/global/DynamicTitle";
import MainButton from "@components/ui/form/MainButton";

function NotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <DynamicTitle title='Not Found' />
            <h1 className="text-8xl text-red-500 mb-3 font-mono">404</h1>
            <p className="text-mainActiveText text-2xl font-semibold text-center">
                You Are lost, This Page Is Not Found! ):
            </p>
            <MainButton className="mt-4" onClick={() => history.back()}>
                Go Back
            </MainButton>
        </div>
    );
}

export default NotFound;
