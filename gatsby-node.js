const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
    {
      allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              date(formatString: "DD:MM:YYYY hh:mm")

            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const posts = result.data.allMarkdownRemark.edges
    // Template For blog-post
    const blogPost = posts.filter(item => item.node.frontmatter.templateKey === 'blog-post')
    blogPost.forEach((post, index) => {
    const previous = index === blogPost.length - 1 ? null : blogPost[index + 1].node
    const next = index === 0 ? null : blogPost[index - 1].node
    
    createPage({
    path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
    component: path.resolve(
     `src/templates/blog-post.js`
      ),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
     })
     })
    // Template For sculpture-sub-page
    const sculpturePage = posts.filter(item => item.node.frontmatter.templateKey === 'sculpture-sub-page')
    sculpturePage.forEach((post, index) => {
      const previous = index === sculpturePage.length - 1 ? null : sculpturePage[index + 1].node
      const next = index === 0 ? null : sculpturePage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/sculpture-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
        // Template For furniture-sub-page
    const furniturePage = posts.filter(item => item.node.frontmatter.templateKey === 'furniture-sub-page')
    furniturePage.forEach((post, index) => {
      const previous = index === furniturePage.length - 1 ? null : furniturePage[index + 1].node
      const next = index === 0 ? null : furniturePage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/furniture-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
        // Template For craft-objects-sub-page
    const craftObjectsPage = posts.filter(item => item.node.frontmatter.templateKey === 'craft-objects-sub-page')
    craftObjectsPage.forEach((post, index) => {
      const previous = index === craftObjectsPage.length - 1 ? null : craftObjectsPage[index + 1].node
      const next = index === 0 ? null : craftObjectsPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/craft-objects-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
        // Template For stitchscapes-sub-page
    const stitchscapesPage = posts.filter(item => item.node.frontmatter.templateKey === 'stitchscapes-sub-page')
    stitchscapesPage.forEach((post, index) => {
      const previous = index === stitchscapesPage.length - 1 ? null : stitchscapesPage[index + 1].node
      const next = index === 0 ? null : stitchscapesPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/stitchscapes-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
        // Template For sketches-sub-page
    const sketchesPage = posts.filter(item => item.node.frontmatter.templateKey === 'sketches-sub-page')
    sketchesPage.forEach((post, index) => {
      const previous = index === sketchesPage.length - 1 ? null : sketchesPage[index + 1].node
      const next = index === 0 ? null : sketchesPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/sketches-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For exhibitions-sub-page
    // const exhibitionsPage = posts.filter(item => item.node.frontmatter.templateKey === 'exhibitions-sub-page')
    // exhibitionsPage.forEach((post, index) => {
    //  const previous = index === exhibitionsPage.length - 1 ? null : exhibitionsPage[index + 1].node
    //  const next = index === 0 ? null : exhibitionsPage[index - 1].node
    //
    //  createPage({
    //    path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
    //   component: path.resolve(
    //     `src/templates/exhibitions-sub-page.js`
    //   ),
    //   context: {
    //     slug: post.node.fields.slug,
    //     previous,
    //      next,
    //   },
    // })
    // })
    //   Template logic for landing pages
    const allPage = posts.filter(item =>
      item.node.frontmatter.templateKey !== 'blog-post' &&
      item.node.frontmatter.templateKey !== 'sculpture-sub-page' &&
      item.node.frontmatter.templateKey !== 'furniture-sub-page' &&
      item.node.frontmatter.templateKey !== 'craft-objects-sub-page' &&
      item.node.frontmatter.templateKey !== 'stitchscapes-sub-page' &&
      item.node.frontmatter.templateKey !== 'sketches-sub-page')
    allPage.forEach((post, index) => {
      const previous = index === allPage.length - 1 ? null : allPage[index + 1].node
      const next = index === 0 ? null : allPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        context: {
          slug: post.node.fields.slug,
          // previous,
          // next,
        },
      })
    })
    return null
  })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
