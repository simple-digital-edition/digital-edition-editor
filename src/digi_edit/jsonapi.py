def jsonapi_type_schema(type_name):
    """Generate a Cerberus schema for validating a JSONAPI type.

    :param type_name: The name of the type
    :type type_name: ``string``
    :return: A Cerberus schema for the JSONAPI type
    """
    return {'type': 'string',
            'required': True,
            'allowed': [type_name],
            'empty': False}


def jsonapi_id_schema(value=None):
    """Generate a Cerberus schema for validating a JSONAPI id value.

    :param value: The required value for the id value [optional]
    :type value: ``string``
    :return: A Cerberus schema for the JSONAPI id value
    """
    if value:
        return {'type': 'string',
                'required': True,
                'empty': False,
                'allowed': [value]}
    else:
        return {'type': 'string',
                'required': True,
                'empty': False}
