import React from 'react'

export interface HeaderModalProps {
  linkUrl?: string
  onClose: () => void
}

export const HeaderModal: React.FC<HeaderModalProps> = props => {
  const { linkUrl = 'https://the-guild.dev', onClose } = props

  return (
    <div id="ossModal" className="g-modal">
      <div className="g-modal-content">
        <span className="g-close" onClick={onClose}>
          &times;
        </span>
        <h3>Featured Products</h3>
        <hr />
        {/* <!--<h3>GraphQL Products</h3>--> */}
        <div
          className="productTable"
          // align="center"
        >
          <div className="flex-item-left">
            <div className="ossCells">
              <img
                src="https://graphql-code-generator.com/img/gql-codegen-cover.png"
                width="100"
              />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-code-generator.com/" target="_blank">
                <h4>Code Generator</h4>
              </a>
              Generate code from GraphQL and operations
            </div>
          </div>
          <div className="flex-item-right">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/tools.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-tools.com/" target="_blank">
                <h4>GraphQL Tools</h4>
              </a>
              <p>
                A set of utilities to build your JavaScript GraphQL schema in a
                concise and powerful way.
              </p>
            </div>
          </div>
          <div className="flex-item-left">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/modules.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-modules.com/" target="_blank">
                <h4>GraphQL Modules</h4>
              </a>
              GraphQL Modules lets you separate your backend implementation to
              small, reusable, easy-to-implement and easy-to-test pieces.
            </div>
          </div>
          <div className="flex-item-right">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/scalars.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a href="https://www.graphql-scalars.dev/" target="_blank">
                <h4>GraphQL Scalars</h4>
              </a>
              A library of custom GraphQL Scalars for creating precise type-safe
              GraphQL schemas.
            </div>
          </div>
          <div className="flex-item-left">
            <div className="ossCells">
              <img
                src="https://graphql-mesh.com/img/mesh-text-logo.svg"
                width="100"
              />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-mesh.com/" target="_blank">
                <h4>GraphQL Mesh</h4>
              </a>
              GraphQL Mesh allows you to use GraphQL query language to access
              data in remote APIs that don't run GraphQL (and also ones that do
              run GraphQL).
            </div>
          </div>
          <div className="flex-item-right">
            <div className="ossCells">
              <img
                src={`${linkUrl}/img/logos/apollo-angular.svg`}
                width="100"
              />
            </div>
            <div className="ossContentCells">
              <a href="https://apollo-angular.com/" target="_blank">
                <h4>Apollo Angular</h4>
              </a>
              A fully-featured, production ready caching GraphQL client for
              Angular and every GraphQL server.
            </div>
          </div>
          <div className="flex-item-left">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/cli.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-cli.com/" target="_blank">
                <h4>GraphQL CLI</h4>
              </a>
              Command line tool for common GraphQL development workflows
            </div>
          </div>
          <div className="flex-item-right">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/config.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-config.com/" target="_blank">
                <h4>GraphQL Config</h4>
              </a>
              One configuration for all your GraphQL tools
            </div>
          </div>
          <div className="flex-item-left">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/sofa.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a href="https://www.sofa-api.com/" target="_blank">
                <h4>GraphQL SOFA</h4>
              </a>
              Generate RESTful APIs from your GraphQL Server
            </div>
          </div>
          <div className="flex-item-right">
            <div className="ossCells">
              <img
                src={`${linkUrl}/img/logos/stencil-apollo.svg`}
                width="100"
              />
            </div>
            <div className="ossContentCells">
              <a
                href="https://github.com/ardatan/stencil-apollo"
                target="_blank"
              >
                <h4>Apollo Stencil</h4>
              </a>
              Stencil-Apollo lets you easily use GraphQL in Web Components.
            </div>
          </div>
          <div className="flex-item-left">
            <div className="ossCells">
              <img
                src="https://raw.githubusercontent.com/dotansimha/graphql-eslint/master/logo.png"
                width="100"
              />
            </div>
            <div className="ossContentCells">
              <a
                href="https://github.com/dotansimha/graphql-eslint/"
                target="_blank"
              >
                <h4>GraphQL ESLint</h4>
              </a>
              GraphQL-ESLint integrates GraphQL AST in the ESLint core (as a
              parser).
            </div>
          </div>
          <div className="flex-item-right">
            <div className="ossCells">
              <img
                src="https://graphql-inspector.com/img/logo.svg"
                width="100"
              />
            </div>
            <div className="ossContentCells">
              <a href="https://graphql-inspector.com/" target="_blank">
                <h4>GraphQL Inspector</h4>
              </a>
              GraphQL Inspector is a set of tools to help you better maintain
              and improve GraphQL API as well as GraphQL consumers.
            </div>
          </div>
          <div className="flex-item-left">
            <div className="ossCells">
              <img src={`${linkUrl}/img/logos/whats-app.svg`} width="100" />
            </div>
            <div className="ossContentCells">
              <a
                href="https://github.com/Urigo/WhatsApp-Clone-Tutorial"
                target="_blank"
              >
                <h4>Whatsapp Clone Tutorial</h4>
              </a>
              An open-source full-stack example app.
            </div>
          </div>
          {/* <!--<div className="flex-item-right">
              <div className="ossCells">
                <img src="https://graphql-inspector.com/img/logo.svg`} width="100" />
              </div>
              <div className="ossContentCells">
                <a href="https://graphql-inspector.com/" target="_blank">
                  <h4>GraphQL Inspector</h4>
                </a>
                GraphQL Inspector is a set of tools to help you better maintain and improve GraphQL API as well as GraphQL consumers.
              </div>
            </div>--> */}
        </div>
      </div>
    </div>
  )
}
