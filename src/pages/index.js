import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"
const IndexPage = ({ data }) => (
  <Layout>
        <article className="sheet">
<h1 className="sheet__title text-align-center">
  Nice to meet you!
</h1>
              <div
                className="sidebar__intro"
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
                }}
              />
                      <p className="text-align-center">
        <a className="pure-button sheet__lead" href={data.datoCmsHome.resume.url}>
          Resume</a>
        </p>
        <h1 className="sheet__title text-align-center">
Projects
</h1>
    <Masonry className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/works/${work.slug}`} className="card__image">
              <Img fluid={work.coverImage.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
        </article>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    datoCmsHome {
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        resume {
        url
      }
            }
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
