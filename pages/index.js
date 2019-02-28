import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'

import Error from 'next/error'
import StoryList from '../components/StoryList'
import Layout from '../components/Layout'



export default class Index extends Component {

  static async getInitialProps({req, res, query}) {

    console.log(query)

    let stories
    let page
    
    try {
      page = Number(query.page) || 1
      const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)

      stories = await response.json()

      return {stories, page}
    } catch(e) {
      stories = []

      return { stories }
    }
  }

  render() {
    const {stories, page} = this.props

    return stories.length === 0 ? <Error statusCode={503}/> : (
      <Layout title="Hacker Next.js" description="A Hacker News clone made with Next.js">
        <StoryList stories={stories}/>
        <footer>
						<Link href={`/?page=${page +1}`}>
							<a>Next Page ({page})</a>
						</Link>
					</footer>
					<style jsx>{`
						footer {
							padding: 1em;
						}

						footer a {
							font-weight: bold;
							color: black;
							text-decoration: none;
						}
					`}</style>
      </Layout>
    )
  }
}