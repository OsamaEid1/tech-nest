"use client"

import MainButton from 'components/ui/form/MainButton'
import SelectTopicsBox from './components/SelectTopicsBox'
import Loading from 'components/ui/Loading'
import { useState } from 'react'
import SelectedTopics from './components/SelectedTopics'

function ManageFollowingTopics() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)



    return (
        <div className="min-h-screen flex justify-center items-center relative text-left py-14">
            {loading && (
                <Loading />
            )}
            <div className="
                    text-lg bg-white shadow-xl shadow-shadows w-fit max-w-[500px] flex flex-col justify-center items-center
                    py-3 px-5 rounded-main text-black
                ">
                <h4 className="font-extrabold mt-1 mb-8 text-xl">Choose The Topics That Interest You</h4>
                <form className="text-center">
                    <SelectTopicsBox />
                    {error && <span className="err-msg mt-2">{ error }</span>}
                    <MainButton
                        type="submit"
                        className="
                            w-fit mx-auto mt-5
                            font-semibold py-1 px-2
                        "
                        disabled={loading}
                    >
                        Submit
                    </MainButton>
                </form>
            </div>
        </div>
    )
}

export default ManageFollowingTopics