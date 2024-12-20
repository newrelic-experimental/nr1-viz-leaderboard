// Amemded from https://github.com/zamarrowski/react-thermometer-component/


import React, { Component } from 'react'

class Thermometer extends Component {
  render() {
    this.options = this._generateOptions();
    const size = `thermometer--${this.options.size()}`;
    const height = { height: `${this.options.height-30}px` };
    const heightPercent = { height: `${this.options.percent()}%` };
    const gradientCSS = this.options.gradient.split(',').length > 1 ? `linear-gradient(${this.options.gradient.split(',')})` : this.options.gradient;
    const heightBgColor = { height: `calc(${this.options.height}px - 57px)`, background: gradientCSS };
    const valstr = this.options.valstr();
    this._createIntervals();
    const stepIntervals = this._createIntervalsUI(this.options.intervals);


    return (
      <div style={height} className={`thermometer ${size} thermometer--theme-light`}>
        <div className="thermometer__draw-a"></div>
        <div className={`thermometer__draw-b`} >
          <div className="bulb" style={{backgroundColor: this.options.baseColor()}}></div>
          </div>
        
        <div className="thermometer__meter">
          <ul className="thermometer__statistics">{stepIntervals}</ul>
          <div style={heightPercent} className="thermometer__mercury">
            <div className="thermometer__percent-current" style={{color:this.options.decorationColor}} >{valstr}</div>
            <div className="thermometer__mask">
              <div className={`thermometer__bg-color`} style={heightBgColor}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _generateOptions() {

    return {
      value: this.props.value || 0, //default 0
      valueFormat: this.props.valueFormat,
      decimalPlaces: this.props.decimalPlaces || 0, 
      max: this.props.max || 100, //default 100
      min: this.props.min || 0, //default 0
      targetFormat: this.props.targetFormat,
      steps: this.props.steps,
      stepFormat: this.props.stepFormat,
      gradient: this.props.gradient ?  this.props.gradient.split(',').reverse().join(',') : "#44ff44,#ff2222", 
      baseColor: () => this.options.gradient.split(',').reverse()[0],
      decorationColor: this.props.decorationColor || "#000",
      size: () => this.props.size === 'small' || this.props.size === 'normal' || this.props.size === 'large' || this.props.size === 'xlarge' ? this.props.size : 'normal',
      height: this.props.height || 200, //default 200
      valstr: () => this.formatLabelData(this.formatValue(this.options.value),this.options.valueFormat),
      percent: () => {
        const percent = ((this.options.value < this.options.min ? 0 : this.options.value-this.options.min) / (this.options.max-this.options.min)) * 100
        return percent == 0 ? 1 : percent; 
      },
      intervals: []
    }
  }

  formatLabelData(val,format)  {
    return format &&  format.length > 0 ? format.replace('\\n','\n').replace('[[value]]',val) : val;
  }
  formatValue(val)  {
    return parseFloat(val).toFixed(this.options.decimalPlaces);
  }

  _createIntervals() {
    // deal with just the target case, i.e. no steps
    if(this.options.targetFormat && this.options.targetFormat != "" && (this.options.steps === 0 || this.options.steps == null || this.options.steps == undefined)) {
      let interval = { final: true, percent: 100, label: this.formatLabelData(this.formatValue(this.options.max),this.options.targetFormat) }
      this.options.intervals.push(interval);
    } else {
      if (this.options.steps != null && this.options.steps!= undefined) { 
        for (let step = 0; step <= this.options.steps; step++) {
          let val = this.options.min+(((this.options.max - this.options.min) / this.options.steps) * step);
          let percent = ((val < this.options.min ? 0 : val-this.options.min) / (this.options.max-this.options.min)) * 100;
          let interval = { final: step==this.options.steps && this.options.targetFormat != "" , percent: percent, label: this.formatLabelData(this.formatValue(val),step==this.options.steps && this.options.targetFormat != "" ? this.options.targetFormat : this.options.stepFormat) }
          this.options.intervals.push(interval);
        }
      }
    }
  }
  

  _createIntervalsUI(intervals) {
    return intervals.map((step, i) => {
      if(step.final) {
        return (
          <li class="targetIndicator" key={i} style={{ color: this.options.decorationColor, bottom: `calc(100% -40px)` }}>
            {step.label}
          </li>
        )
      } else {
      return (
        <li class="lineIndicator" key={i} style={{ bottom: `calc(${step.percent}% - ${intervals.length-1 == i ? "20": "1"}px)` }}>
          {step.label}
        </li>
      )
    }
    })
  }

}

export default Thermometer