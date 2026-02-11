import { StorageImage } from '@aws-amplify/ui-react-storage';
import { generateClient } from 'aws-amplify/data';
import { useParams } from 'react-router'
import { DriverType } from './Drivers';
import { Schema } from '../../amplify/data/resource';
import React, { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react';
import { checkLoginAndGetName } from '../utils/AuthUtils';
import Comment from './Comment';

function DriverDetails() {
    const client = generateClient<Schema>();
    const { id } = useParams();

    const [driver, setDriver] = useState<DriverType | undefined>(undefined)
 const [userName, setUserName] = useState<string | undefined>()
    const [comment, setComment] = useState<string>('')

    useEffect(() => {
        const handleData = async () => {
            const name = await checkLoginAndGetName();
            if (name) {
                setUserName(name)
            }
            const result = await client.models.drivers.get({ id: id! })
            if (result.data) {
                setDriver(result.data)
            }
        }
        handleData();
const sub = client.models.drivers.onUpdate({
            filter: {
                id: {
                    eq: id!
                }
            }
        }).subscribe({
            next: (data) => {
                if (data) {
                    setDriver(data)
                }
            }
        })
        return () => sub.unsubscribe();
    }, [])
    function renderPhotos() {
        const rows: React.JSX.Element[] = []
        if (driver) {
            driver.photos?.forEach((photo, index) => {
                if (photo) {
                    /**
                     * Files can be also handled with the aws-amplify/storage package:
                     * https://docs.amplify.aws/angular/build-a-backend/storage/download-files/
                     */
                    rows.push(<StorageImage path={photo} alt={photo} key={index} height={300} />)
                }
            })
        }
        return rows;
    }

    async function addComment(event: SyntheticEvent) {
        event.preventDefault();
        if (comment) {
            const currentComments = driver?.comments ?? []
            await client.models.drivers.update({
                id: id!,
                comments: [...currentComments!, {
                    author: userName,
                    content: comment
                }]
            })
            setComment('')
        }
    }

    function renderCommentForm() {
        if (userName) {
            return (
                <form onSubmit={(e) => addComment(e)}>
                    {/* <input onChange={(e: CustomEvent) => setComment(e.target?.value)} value={comment} /><br /> */}
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if ((e.target as HTMLInputElement)?.type === 'text') {
                                setComment((e.target as HTMLInputElement)?.value);
                            }
                        }}
                        value={comment}
                    /><br />
                    <input type="submit" value='Add comment' />
                </form>
            )
        }
    }
    
    function renderComments() {
        const rows: React.JSX.Element[] = []
        if (driver?.comments) {
            for (let index = 0; index < driver.comments.length; index++) {
                const comment = driver.comments[index];
                rows.push(
                    <Comment author={comment?.author} content={comment?.content} key={index} />
                )

            }
        }
        return rows
    }
    
    function renderDriver() {
        if (driver) {
            return <div>
                <h2>Details for driver {driver?.name}</h2><br />
                <p>{driver?.name}</p>
                <p>{driver?.team}</p>
                {renderPhotos()}<br />
                 {renderCommentForm()}
                <p>Comments:</p>
                {renderComments()}
            </div>
        } else {
            return <h2>Driver not found</h2>
        }
    }
    return <main>
        {renderDriver()}
    </main>
}

export default DriverDetails
