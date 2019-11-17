import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from "../components/layout"
import * as emailjs from "emailjs-com"
require('purecss')
const Contact = ({ data: { contact } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={contact.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{contact.title}</h1>
        <p className="sheet__lead">{contact.subtitle}</p>
        <div
          className="sheet__body"
        />
        <Formik
          initialValues={{ sender: '', email: '', message: '' }}
          validate={values => {
            const errors = {};
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
            let template_params = {
              reply_to: values.email,
              from_name: values.name,
              to_name: "Tomoya Kuroda",
              message_html: values.message,
            }

            let service_id = "default_service"
            let template_id = "template_bI7QUFno"

            emailjs
              .send(
                service_id,
                template_id,
                template_params,
                process.env.GATSBY_EMAILJS_USERID
              )
              .then(res => {
                console.log(res)
                alert('Thank you for contacting me!');
                values.name=''
                values.email=''
                values.message=''
                setSubmitting(false);
              })
              .catch(err => {
                console.error(err)
              })
          }}
        >
          {({ isSubmitting }) => (
            <Form className="pure-form pure-form-stacked">
              <label>Name</label>
              <Field type="text" name="name" className="pure-input-1" required />
              <ErrorMessage name="name" component="div" />
              <label>Email</label>
              <Field type="email" name="email" className="pure-input-1" required />
              <ErrorMessage name="email" component="div" />
              <label>Message</label>
              <Field type="text" name="message" as='textarea' className="pure-input-1" required />
              <ErrorMessage name="message" component="div" />
              <button type="submit" disabled={isSubmitting} className="pure-button pure-button-primary">
                Submit
          </button>
            </Form>
          )}
        </Formik>
      </div>
    </article>
  </Layout>
)

export default Contact

export const query = graphql`
  query ContactQuery {
    contact: datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
    }
  }
`
