"use client";
import MainButton from "@components/ui/form/MainButton";
import MainInput from "@components/ui/form/MainInput";
import Loading from "@components/ui/Loading";
import Popup from "@components/ui/Popup";
import Modal from "@components/ui/Modal";
import { createNewTopic } from "app/helpers/admin/topics/createNewTopic";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setUpdatedTopics } from "state/slices/topicsSlice";

function AddTopicIntercept() {
    const [topicName, setTopicName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Popup
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    // Redux
    const dispatch = useAppDispatch();
    const topics = useAppSelector((state) => state.topics.topics);

    const isTopicExist = () => {
        return topics.some(
            (t) => t.name.toLowerCase() === topicName.toLowerCase()
        );
    };

    const handleCreateNewTopic = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isTopicExist()) throw "This topic already exist!";

            const newTopic = await createNewTopic(topicName);
            dispatch(setUpdatedTopics([...topics, newTopic]));
            setIsPopupOpened(true);
            setTopicName("");
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onToggle={() => history.back()}>
            {isPopupOpened && (
                <Popup
                    text="The New Topic is Created Successfully"
                    type='success'
                    onToggle={() => setIsPopupOpened(false)}
                />
            )}
            <form className="main-card" onSubmit={handleCreateNewTopic}>
                {loading && <Loading className="rounded-main" />}
                <h2 className="mt-3 mb-7">Add New Topic</h2>
                <MainInput
                    type="text"
                    placeholder="Enter Topic Name"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    required={true}
                />
                <span className="err-msg">{error}</span>
                <MainButton
                    type="submit"
                    className="mt-4"
                    disabled={loading}
                >
                    Submit
                </MainButton>
            </form>
        </Modal>
    );
}

export default AddTopicIntercept;