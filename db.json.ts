// Generator schema for use with https://json-generator.com/
{
  records: [
    '{{repeat(10)}}',
    {
      id: '{{index()}}',
      name: '{{firstName()}} {{surname()}}',
      department: '{{company().toUpperCase()}}',
      email: '{{email()}}',
      phone: '+359 {{phone()}}',
      address:
        '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
      salary: '{{floating(1000, 4000, 2, "$0,0.00")}}'
    }
  ]
}
