
def apply(function, input_tensor, instruments, params={}):

    output_dict = {}
    for instrument in instruments:
        out_name = f'{instrument}_spectrogram'
        output_dict[out_name] = function(
            input_tensor,
            output_name=out_name,
            params=params)
    return output_dict
