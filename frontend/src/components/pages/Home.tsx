import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react'
import PostCard from './../PostCard';

function Home(props: any) {
    const { loading, data } = useQuery(GET_POSTS);
    let posts:any = [];
    if(data){
         posts = data.getPosts;
    }
    
    console.log(posts);
    
    return (
        <Grid columns={3} >
            <Grid.Row className="page-title">
                <h1>Recent posts</h1>
            </Grid.Row>
        <Grid.Row>
         {
             loading ? (<h1>Loading posts...</h1>) : (
                 data && posts && posts.map((post: any) => (
                    <Grid.Column key={post.id} style={{marginBottom: 20}} >
                        <PostCard post={post}/>
                     </Grid.Column>
                 ))
            )
         }
    
        </Grid.Row>
      </Grid>
    );
}

const GET_POSTS = gql`
   { 
       getPosts{
            id
            body
            user{
                id
                username
            }
            createdAt
            likeCount
            commentCount
            likes{
                id
                createdAt
                user{
                    id
                    username
                }
            }
            comments{
                id 
                createdAt
                user{   
                    id
                    username
                }
            }

        }
    }
`;

export default Home;