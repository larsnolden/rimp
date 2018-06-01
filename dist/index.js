'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var string = _propTypes2.default.string;

var Rimp = function (_Component) {
  _inherits(Rimp, _Component);

  function Rimp(props) {
    _classCallCheck(this, Rimp);

    var _this = _possibleConstructorReturn(this, (Rimp.__proto__ || Object.getPrototypeOf(Rimp)).call(this, props));

    _this.state = {
      buttonValue: props.buttonValue,
      buttonStyles: props.buttonStyles,
      containerStyles: props.containerStyles,
      placeholder: props.placeholder,
      inputStyles: props.inputStyles,
      formWrapper: props.formWrapper,
      completeMessage: props.completeMessage,
      valid: false,
      isTyping: false,
      showError: props.showError,
      helpText: props.helpText,
      mailChimpUrl: props.mailChimpUrl,
      onSubmittedRender: props.onSubmittedRender,
      submitted: false
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.validateEmail = _this.validateEmail.bind(_this);
    _this.returnStyles = _this.returnStyles.bind(_this);
    return _this;
  }

  _createClass(Rimp, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var self = this;
      var isValid = this.state.valid;
      if (isValid) {
        (0, _reqwest2.default)({
          method: 'get',
          type: 'jsonp',
          contentType: 'application/json',
          url: this.state.mailChimpUrl,
          data: { EMAIL: this.state.emailAddress, STATUS: 'subscribed' },
          jsonpCallback: 'c'
        }).then(function (resp) {
          self.setState({
            submitted: true
          });
        }).fail(function (err, msg) {
          console.log(err);
          self.setState({
            submitted: true
          });
        }).always(function (resp) {
          self.setState({
            submitted: true
          });
        });
        self.setState({
          submitted: true
        });
      }
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(e) {
      this.setState({
        isTyping: true
      });
      function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      if (validateEmail(e.currentTarget.value)) {
        this.setState({
          valid: true,
          emailAddress: e.currentTarget.value
        });
      } else {
        this.setState({
          valid: false
        });
      }
    }
  }, {
    key: 'returnStyles',
    value: function returnStyles() {
      var styles = '' + this.state.containerStyles;
      if (this.state.isTyping) {
        styles += ' ' + (this.state.valid ? 'valid' : 'not-valid');
      }
      return styles;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.returnStyles() },
        !this.state.submitted ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit, className: this.state.formWrapper },
            _react2.default.createElement('input', { type: 'email', onChange: this.validateEmail, ref: 'email', className: this.state.inputStyles, placeholder: this.state.placeholder }),
            _react2.default.createElement(
              'button',
              { className: this.state.buttonStyles },
              this.state.buttonValue
            )
          ),
          this.state.showError ? _react2.default.createElement(
            'div',
            null,
            !this.state.valid && this.state.isTyping ? _react2.default.createElement(
              'div',
              { className: 'error' },
              this.state.helpText
            ) : null
          ) : null
        ) : this.state.onSubmittedRender()
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        buttonValue: 'submit',
        buttonStyles: 'button',
        placeholder: 'enter your email address',
        formWrapper: 'flex flex-justify-between flex-align-center',
        containerStyles: 'newsletter__form',
        completeMessage: 'Thanks for subscribing',
        helpText: 'Please provide a valid email address',
        showError: true,
        emailAddress: '',
        mailChimpUrl: null,
        onSubmittedRender: function onSubmittedRender() {
          return _react2.default.createElement('div', null);
        }
      };
    }
  }]);

  return Rimp;
}(_react.Component);

exports.default = Rimp;


Rimp.propTypes = {
  mailChimpUrl: string.isRequired
};