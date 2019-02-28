import Link from 'next/link'

export default class Test extends React.Component {

  static async getInitialProps({req, res, query}) {
    
    let page = Number(query.page) || 1

    return {page}
  }
  render() {
    const {page} = this.props

    return (
      <div>
        <h2>You are on Page {page}</h2>
        <Link  href={`/test?page=${page - 1}`}>
          <a>Previous fuckin page</a>
        </Link>
        <Link  href={`/test?page=${page + 1}`}>
          <a>Next fuckin page</a>
        </Link>
      </div>
    )
  }
}